import { NextApiResponse, NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_3L9Nq2Gxwq1EXbgjNTfXYQigRSY=",
  privateKey: "private_c9+KS7Rgk1XB+SyUqW13tP9fLQ4=",
  urlEndpoint: "https://ik.imagekit.io/a1vxyxo8m/"
});

export async function GET(req, res) {
    try {
      const result = await new Promise((resolve, reject) => {
        imagekit.listFiles({ skip: 0, limit: 10 }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }


  export async function POST(req) {
    try {
      // Extract files from the request body
      const  file  = await req.formData();  
      const photo = file.get("file");
      const bytelenght = await photo.arrayBuffer();
      const buffer = Buffer.from(bytelenght)

      // Upload the file to ImageKit
     const result =  await new Promise((resolve, reject) => {
        imagekit.upload({
            file :buffer, //required
            fileName : photo.name,   //required
        }).then(response => {
            resolve(response);
    
        }).catch(error => {
            reject(error);
    
        });
      });


    //   // Loop through each file and upload it to ImageKits
    //   const uploadPromises = files.map(async (file) => {
    //     const uploadResponse = await imagekit.upload({
    //       file: file, // File object from the request body
    //       fileName: file.name, // Use the file name as the uploaded file name
    //       // Add any additional options if needed
    //     });
    //     return uploadResponse;
    //   });
  
    //   // Wait for all upload promises to resolve
    //   const responses = await Promise.all(uploadPromises);
  
    //   // Return the responses from ImageKit as a JSON response
     return NextResponse.json(result, { status: 200 });
    } catch (error) {
      // Handle errors
      return NextResponse.error('Internal server error', { status: 500 });
    }
  }
