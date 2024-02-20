import { Configuration } from 'OpenAI';
// import { OpenAIApi, Configuration } from 'openai';
// import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;