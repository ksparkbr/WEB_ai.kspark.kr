const express = require('express');
const bcrypt = require('bcrypt');
const sqlMap = require('../../database/sql-map');
const jwt = require('jsonwebtoken');
const checkSession = require('../../util/check-session');

const authRouter = express.Router();

authRouter.post('/register', async (req, res)=>{
    console.log(req.body);
    let {id, password, passwordConfirm} = req.body;
    let isExist = await sqlMap.auth.selectUser({user_id: id});
    if(isExist.length > 0){
        res.status(401).send({msg : '사용자ID가 이미 존재합니다.'})
        return;
    }
    let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    
    await sqlMap.auth.insertUser({
        user_id : id,
        password : hashedPassword,
    })
    res.send({msg : '가입완료. 로그인 후 이용하세요'});
    return;
})

authRouter.post('/login', async (req, res)=>{
    let {user_id, password} = req.body;
    let user = await sqlMap.auth.selectUser({user_id});
    if(user.length > 0){
        if(bcrypt.compareSync(password, user[0].password)){
            req.session.user_id = user[0].user_id;
            req.session.is_login = true;
            req.session.role = user[0].role;
            req.session.save(()=>{
                res.send({
                    user_id : req.session.user_id,
                    is_logined : req.session.is_login,
                    role: req.session.role,
                })
            })
        }
        else{
            res.status(401).send('Unauthorized');
        }
    }
    else{
        res.status(401).send('Unauthorized');
    }
})

authRouter.get("/check", checkSession, async (req, res)=>{
    res.send({
        user_id : req.session.user_id,
        is_logined : req.session.is_login,
        role : req.session.role,
    });
})

authRouter.post("/changepass", checkSession, async (req, res)=>{
    let user_id = req.session?.user_id;
    let {password, newPassword, newPasswordConfirm} = req.body;
    console.log(user_id, password, newPassword, newPasswordConfirm)

    res.send('test')
})

authRouter.get("/logout", async (req, res)=>{
    req.session.destroy();
    res.send({msg : "Logout"});
})
module.exports = authRouter;