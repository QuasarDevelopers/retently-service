const Pageres = require('pageres');
module.exports = async (options)=>{
    let size = options.size || '1280x1024';
    let full = options.full || false;
    let delay = options.delay || 3;


    let filename = options.url.replace(/[\/:.]/g, '');


    let page = new Pageres({
        delay: delay,
        crop: !full,
        filename: filename,
        format: 'png'
    });
    await page.src(options.url, [size]).dest(__dirname + '/../../public/images').run();
    return filename;
}
