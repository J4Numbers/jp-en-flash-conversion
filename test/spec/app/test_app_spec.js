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

const application = '../../../src/app';

describe('The application on http/s', function () {
   before(function () {
       process.env.ALLOW_CONFIG_MUTATIONS = 'true';
       process.env.NODE_CONFIG = JSON.stringify(require('../../../config/test'));
       const testConfig = importFresh('config');
       expect(
           testConfig.get('app.http2.enabled'),
           'HTTP2 should be disabled'
       ).to.equal(false);
       startMockRequire('config', testConfig);
   });

   after(function () {
       stopMockRequire('config');
   });

   describe('Basic pages', function () {
       afterEach(function () {
           clearModule(application);
       });

       it('Should be reachable through HTTP', function () {
          return request(testRequire(application))
              .get('/')
              .then((response) => {
                 expect(response).to.have.status(200);
                 expect(response).to.be.html;
              });
       });
   });

   describe('Error pages', function () {
       afterEach(function () {
           clearModule(application);
       });

       it('Should return a 404 page for non-existent URLs', function () {
          return request(testRequire(application))
              .get('/this-path-will-never-exist')
              .then((response) => {
                  expect(response).to.have.status(404);
                  expect(response).to.be.html;
              });
       });
   })
});
