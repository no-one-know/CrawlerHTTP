const {normalizeURL, geturlsfromHTML} = require('./crawler');
const {test, expect} = require('@jest/globals');

test('normalizeurl', () => {
    const input='https://www.google.com'
    const received=normalizeURL(input)
    const expected='www.google.com'
    expect(received).toEqual(expected)
});

test('normalizeurl ending slash', () => {
    const input='https://www.google.com/'
    const received=normalizeURL(input)
    const expected='www.google.com'
    expect(received).toEqual(expected)
});

test('normalizeurl with path', () => {
    const input='https://www.google.com/path/to/somewhere/'
    const received=normalizeURL(input)
    const expected='www.google.com/path/to/somewhere'
    expect(received).toEqual(expected)
});

test('normalizeurl capital', () => {
    const input='https://www.GOOGLE.com/path/to/somewhere/'
    const received=normalizeURL(input)
    const expected='www.google.com/path/to/somewhere'
    expect(received).toEqual(expected)
});

test('normalizeurl invalid', () => {
    const input='invalid'
    const received=normalizeURL(input)
    const expected=''
    expect(received).toEqual(expected)
});

test('geturlsfromHTML absolute',()=>{
    const htmlbody=`
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const baseurl="https://blog.boot.dev"
    const received=geturlsfromHTML(htmlbody,baseurl)
    const expected=["https://blog.boot.dev/"]
    expect(received).toEqual(expected)
})

test('geturlsfromHTML relative',()=>{
    const htmlbody=`
    <html>
        <body>
            <a href="/path">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const baseurl="https://blog.boot.dev"
    const received=geturlsfromHTML(htmlbody,baseurl)
    const expected=["https://blog.boot.dev/path"]
    expect(received).toEqual(expected)
})

test('geturlsfromHTML invalid',()=>{
    const htmlbody=`
    <html>
        <body>
            <a href="invalid">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const baseurl="https://blog.boot.dev"
    const received=geturlsfromHTML(htmlbody,baseurl)
    const expected=[]
    expect(received).toEqual(expected)
})
