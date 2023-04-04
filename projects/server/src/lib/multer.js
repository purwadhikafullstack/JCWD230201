// Import multer
const multer = require('multer')

// Import File System
const fs = require('fs')

let defaultPath = 'Public'
var storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        // console.log(file)

        let isDirectoryExist = fs.existsSync(__dirname + `${defaultPath}/${file.fieldname}`)

        if (!isDirectoryExist) {
            await fs.promises.mkdir(__dirname + `${defaultPath}/${file.fieldname}`, { recursive: true });
        }

        if (file.fieldname === 'images') {
            cb(null, __dirname + `${defaultPath}/${file.fieldname}`)
        }
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, 'PIMG' + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

var fileFilter = (req, file, cb) => {
    // console.log(file)
    if (file.mimetype.split('/')[0] === 'image') {
        // Accept
        cb(null, true)
    } else if (file.mimetype.split('/')[0] !== 'image') {
        //Reject
        cb(new Error('File Must Be Image!'))
    }
}

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter })