import { NextApiResponse, NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_3L9Nq2Gxwq1EXbgjNTfXYQigRSY=",
  privateKey: "private_c9+KS7Rgk1XB+SyUqW13tP9fLQ4=",
  urlEndpoint: "https://ik.imagekit.io/a1vxyxo8m/"
});

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await new Promise((resolve, reject) => {
      imagekit.listFiles({ skip: 0, limit: 100, sort: "DESC_CREATED", searchQuery: 'published = true' }, (error, result) => {
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


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract files from the request body
    const formData = await req.formData();

    // Get array of files from the FormData
    const files = Array.from(formData.getAll('file'));

    // Upload each file to ImageKit concurrently
    const uploadPromises = files.map(async (file: File) => {
      const bytelength = await file.arrayBuffer();
      const buffer = Buffer.from(bytelength);

      // Determine file type (image or video) based on MIME type
      const fileType = file.type.startsWith('image') ? 'image' : 'video';
      // Upload file to ImageKit
      return imagekit.upload({
        file: buffer,
        fileName: file.name,
        fileType: fileType, // Specify file type (image or video)
      });
    });

    // Wait for all upload promises to resolve
    const responses = await Promise.all(uploadPromises);

    // Return the responses from ImageKit as a JSON response
    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.error('Internal server error', { status: 500 });
  }
}
