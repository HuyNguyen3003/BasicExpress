
import pool from '../configs/connectDB'


let getAlluser = async (req, res) => {


    const [rows, fields] = await pool.execute(`SELECT * FROM users `);
    return res.status(200).json({
        Message: 'ok',
        data: rows,
    })

}

let creatUserapi = async (req, res) => {

    let { firstName, lastName, email, address } = req.body
    console.log('check req', req.body)

    await pool.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)',
        [firstName, lastName, email, address]);


    return res.status(200).json({
        Message: 'ok',
    })

}
let updateapi = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body


    await pool.execute('update users set firstName = ?, lastName = ?, email = ? , address = ? where id = ? ',
        [firstName, lastName, email, address, id]);

    return res.status(200).json({
        Message: 'ok',
    })
}
let deleteapi = async (req, res) => {
    let userID = req.params.id
    await pool.execute('delete from users where id = ?', [userID])
    return res.status(200).json({
        Message: 'ok',
    })
}


module.exports = {
    getAlluser,
    creatUserapi,
    updateapi,
    deleteapi,
}