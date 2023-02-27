const express = require('express');
const bcrypt = require('bcrypt');
const sqlMap = require('../../database/sql-map');
const authRouter = express.Router();

authRouter.post('/register', async (req, res)=>{
    console.log(req.body);
    let {id, password, passwordConfirm} = req.body;
    let isExist = await sqlMap.auth.selectUser({user_id: id});
    if(isExist.length > 0){
        res.send({msg : '사용자ID가 이미 존재합니다.'})
    }
    let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    
    await sqlMap.auth.insertUser({
        user_id : id,
        password : hashedPassword,
    })
    res.send({msg : '가입완료. 로그인 후 이용하세요'});
})

authRouter.post('/login', async (req, res)=>{
    let {user_id, password} = req.body;
    let user = await sqlMap.auth.selectUser({user_id});
    if(user.length > 0){
        if(bcrypt.compareSync(password, user[0].password)){
            req.session.user_id = user[0].user_id;
            req.session.is_login = true;
            req.session.save(()=>{
                res.send({
                    user_id : req.session.user_id,
                    is_logined : req.session.is_login,
                })
            })
        }
    }
    else{
        res.send({msg : "로그인 실패"});
    }
})

authRouter.get("/check", async (req, res)=>{
    res.send({
        user_id : req.session.user_id,
        is_logined : req.session.is_login,
    });
})

authRouter.get("/logout", async (req, res)=>{
    req.session.destroy();
    res.send({msg : "Logout"});
})
module.exports = authRouter;