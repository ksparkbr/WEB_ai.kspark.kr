const express = require('express')
const openAiRouter = express.Router()
const {Configuration, OpenAIApi} = require('openai')
const key = process.env.OPEN_AI_KEY;
const openai = new OpenAIApi(new Configuration({apiKey: key, stream: true}))

openAiRouter.post("/prompt", async (req, res)=>{
    try{
        let {prompt} = req.body;
        if(prompt?.length == 0){
            prompt.push('인사');
        }
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: prompt.join('\n')}],
        })
        res.send(response.data.choices[0]);
    } catch(e){
        console.log(e.response.data.error);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = openAiRouter;