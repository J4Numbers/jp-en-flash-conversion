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

const renderer = require('../../lib/renderer').nunjucksRenderer();

const dictionaryHandler = require('../../js/dictionary').default();
const flashcardHandler = require('../../js/flashcards').default();

const loadAvailableModules = async (req, res, next) => {
    res.locals.modules = await dictionaryHandler.returnAvailableModules();
    next();
}

const renderResponse = (req, res, next) => {
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/choose-pack.njk', {
        ...res.nunjucks,
        ...res.locals.modules,
    }));
    next();
};

const initialiseBodyVars = (req, res, next) => {
    if (!req.body) {
        req.body = {};
    }
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

const loadIntoFlashcardHandler = async (req, res, next) => {
    res.locals.token = await flashcardHandler.registerNewFlashcardRevision(res.locals);
    next();
}

const redirectToFlashcardGame = (req, res, next) => {
    res.redirect(303, `/play?token=${res.locals.token}`, next);
}

module.exports = (server) => {
    server.get('/choose-packs', loadAvailableModules, renderResponse);
    server.post('/choose-packs', initialiseBodyVars, loadIntoFlashcardHandler, redirectToFlashcardGame);
};
