import pool from '../configs/connectDB'
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');


let getHomepage = async (req, res) => {

  const [rows, fields] = await pool.execute(`SELECT * FROM users `);
  return res.render('index.ejs', { dataUser: rows })

}

let getAboutpage = (req, res) => {

  return res.send('Hello World- about!')
}
let getDetailPage = async (req, res) => {
  let userid = req.params.id;
  let [user] = await pool.execute(`select * from users where id  = ?`, [userid])
  console.log('>>> check req params: ', user)
  return res.send(JSON.stringify(user))
}
let createnewuser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body
  console.log('check req', req.body)

  await pool.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)',
    [firstName, lastName, email, address]);
  return res.redirect('/')


}
let deleteuser = async (req, res) => {
  let userID = req.body.userID
  await pool.execute('delete from users where id = ?', [userID])

  return res.redirect('/')
}
let edituser = async (req, res) => {
  let id = req.params.id
  let [user] = await pool.execute('Select * from users where id = ?', [id])
  return res.render('update.ejs', { dataUser: user[0] })

}
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body


  await pool.execute('update users set firstName = ?, lastName = ?, email = ? , address = ? where id = ? ',
    [firstName, lastName, email, address, id]);

  return res.redirect('/')
}

let uploadfile = async (req, res) => {
  return res.render('upload.ejs')
}

let uploadprofile = async (req, res) => {

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.file) {
    return res.send('Please select an image to upload');
  }

  // Display uploaded image for user validation
  res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./upload">Upload another image</a>`);

}

let uploadmultiple = async (req, res) => {


  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.files) {
    return res.send('Please select an image to upload');
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);



}


module.exports = {
  getHomepage,
  getAboutpage,
  getDetailPage,
  createnewuser,
  deleteuser,
  edituser,
  updateUser,
  uploadfile,
  uploadprofile,
  uploadmultiple,
}