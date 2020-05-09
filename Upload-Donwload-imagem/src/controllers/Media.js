
'use strict';

const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename);
const gm = require('gm');
const fs = require('fs');

const exists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
};

const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

class Media {

    thumb(request, response) {
        let image = ABSPATH +  this.src;

        if(this.isValidBaseDir(this.src) && this.isValidMedia(this.src) && exists(image)) {

            let width = (request.query.w && /^\d+$/.test(request.query.w)) ? request.query.w : '100';
            let height = (request.query.h && /^\d+$/.test(request.query.h)) ? request.query.h : '100';
            let extension = getFileExtension(this.src);
            let mime = (extension === 'jpeg' || extension === 'jpg') ? 'jpeg' : 'png';

            response.type(mime);

            gm(image).resize(width, height).stream().pipe(response);
        } else {
            response.sendStatus(404);
        }    
    }
}

module.exports = Media;