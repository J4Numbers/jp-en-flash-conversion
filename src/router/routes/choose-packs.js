/*
 * MIT License
 *
 * Copyright (c) 2020 J4Numbers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const renderer = require('../../lib/renderer').nunjucksRenderer();

const fileRegex = /[a-zA-Z]+_([0-9]+)\.json/

const fileSort = (a, b) => {
    const aRegex = fileRegex.exec(a);
    const bRegex = fileRegex.exec(b);
    if (aRegex && bRegex) {
        return Number.parseInt(aRegex[1]) - Number.parseInt(bRegex[1]);
    } else if (aRegex) {
        return 1;
    } else if (bRegex) {
        return -1;
    } else {
        return 0;
    }
};

const loadHiragana = (req, res, next) => {
    const files = fs.readdirSync(path.resolve('locale', 'en', 'hiragana'))
        .sort(fileSort);
    res.locals.hiragana = files.map((file) => JSON.parse(
        fs.readFileSync(
            path.resolve('locale', 'en', 'hiragana', file),
        ).toString('utf-8')),
    );
    next();
};

const loadKatakana = (req, res, next) => {
    const files = fs.readdirSync(path.resolve('locale', 'en', 'katakana'))
        .sort(fileSort);
    res.locals.katakana = files.map((file) => JSON.parse(
        fs.readFileSync(
            path.resolve('locale', 'en', 'katakana', file),
        ).toString('utf-8')),
    );
    next();
};

const loadKanji = (req, res, next) => {
    res.locals.kanji = [
        {
            id: 'kanji-1',
            name: 'Kanji set 1',
            description: 'The first set of letters from the kanji alphabet',
        },
        {
            id: 'kanji-2',
            name: 'Kanji set 2',
            description: 'The second set of letters from the kanji alphabet',
        },
        {
            id: 'kanji-3',
            name: 'Kanji set 3',
            description: 'The third set of letters from the kanji alphabet',
        },
        {
            id: 'kanji-4',
            name: 'Kanji set 4',
            description: 'The fourth set of letters from the kanji alphabet',
        },
    ];
    next();
};

const renderResponse = (req, res, next) => {
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/choose-pack.njk', {
        ...res.nunjucks,
        ...res.locals,
    }));
    next();
};

const initialiseBodyVars = (req, res, next) => {
    res.locals.hiragana = (Object.prototype.hasOwnProperty.call(req.body, 'hiragana'))
        ? (Array.isArray(req.body.hiragana)
            ? req.body.hiragana
            : [req.body.hiragana])
        : [];
    res.locals.katakana = (Object.prototype.hasOwnProperty.call(req.body, 'katakana'))
        ? (Array.isArray(req.body.katakana)
            ? req.body.katakana
            : [req.body.katakana])
        : [];
    res.locals.kanji = (Object.prototype.hasOwnProperty.call(req.body, 'kanji'))
        ? (Array.isArray(req.body.kanji)
            ? req.body.kanji
            : [req.body.kanji])
        : [];
    next();
}

const loadIntoFlashcardHandler = (req, res, next) => {
    res.locals.token = 'abc123';
    next();
}

const redirectToFlashcardGame = (req, res, next) => {
    res.redirect(303, `/play?token=${res.locals.token}`, next);
}

const quickRender = (req, res, next) => {
    const hiraCount = res.locals.hiragana.length;
    const hiraText = `\r\n- ${hiraCount} hiragana packs`;
    const kataCount = res.locals.katakana.length;
    const kataText = `\r\n- ${kataCount} katakana packs`;
    const kanjiCount = res.locals.kanji.length;
    const kanjiText = `\r\n- ${kanjiCount} kanji packs`;
    res.contentType = 'text/plain';
    res.header('content-type', 'text/plain');
    res.send(200, `Found ${hiraCount + kanjiCount + kataCount} language packs to be added... ${hiraText} ${kataText} ${kanjiText}`);
    next();
}

module.exports = (server) => {
    server.get('/choose-packs', loadHiragana, loadKatakana, loadKanji, renderResponse);
    server.post('/choose-packs', initialiseBodyVars, quickRender);
};
