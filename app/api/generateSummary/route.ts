import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // todos in the body ofthe POST req
    const { todos } = await request.json();
    console.log(todos);

    // communicate with openAI GPT
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", //change to 'gpt-4' if you have access to it
        // model: "gpt-4",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: 'When responding , welcome the user always as Dev Chi and say welcome to Dev Chi Todo App! Limit the response to 200 characters',
            },
            {
                role: "user",
                content: `Hi there, provide the summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
                    todos
                )}`,
            }
        ]
    });

    const data  = response;

    // console.log("Data Is: ", data);
    // console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}