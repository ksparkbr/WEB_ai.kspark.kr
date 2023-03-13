const express = require('express')
const openAiRouter = express.Router()
const {Configuration, OpenAIApi} = require('openai')

openAiRouter.post("/prompt", async (req, res)=>{
    try{
        let {prompt} = req.body;
        const key = process.env.OPEN_AI_KEY;

        const openai = new OpenAIApi(new Configuration({apiKey: key}))
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: prompt}],
        })
        res.send(response.data.choices[0]);
    } catch(e){
        console.log(e.messages);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = openAiRouter;