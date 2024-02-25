import openai from "@/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);


export async function POST(request: Request) {
    // todos in the body ofthe POST req
    const { todos } = await request.json();
    console.log(todos);

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: `Hi there, provide the summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
                        todos
                )}`
            },
            {
                role: "model",
                parts: "When responding , welcome the user always as Dev Chi and say welcome to Dev Chi Todo App! Limit the response to 200 characters",
            },
            ],
            generationConfig: {
            maxOutputTokens: 100,
            },
        });

        const msg = "Give a summary of my todos";

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        // console.log(text);


    // communicate with openAI GPT
    // const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo", //change to 'gpt-4' if you have access to it
    //     // model: "gpt-4",
    //     temperature: 0.8,
    //     n: 1,
    //     stream: false,
    //     messages: [
    //         {
    //             role: "system",
    //             content: 'When responding , welcome the user always as Dev Chi and say welcome to Dev Chi Todo App! Limit the response to 200 characters',
    //         },
    //         {
    //             role: "user",
    //             content: `Hi there, provide the summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
    //                 todos
    //             )}`,
    //         }
    //     ]
    // });

    const data  = text;

    // console.log("Data Is: ", data);
    // console.log(data.choices[0].message);

    return NextResponse.json(data);
}