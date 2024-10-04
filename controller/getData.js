const xlsx = require('xlsx');
const convertExcelToJson = require('../../service/convertExcelToJson').convertExcelToJson
const sendRequest = require('../../service/wrapper').sendRequest
const fs = require('fs');
const path = require('path');
const config = require('../config/data/config.json');
const { error } = require('console');
const url = config.credentials.url;

const languages = {
    "marathi":"mr",
    "hindi":"hi",
    "odia":"or",
    "asameese":"as",
    "bengali":"bn",
    "gujarati":"gu",
    "kannada":"kn",
    "malyalam":"ml",
    "tamil":"ta",
    "telugu":"te"
}

async function soundConversion(req, res){
    const workbook = xlsx.read(req.file.buffer,{type : 'buffer'});
    const excelConversion = await convertExcelToJson(workbook);

    try{
        if(excelConversion.status === true) {
            const promptData = excelConversion.data;
            console.log(promptData);
            // res.send(promptData);
            // return promptData

            const outputPath = config.paths.wavPath;

            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath);
            }
            // res.send(promptData);

            
            for(let i = 0; i< promptData.length; i++){
                console.log("error 1");
                const fileName = String(promptData[i].FileName);
                const filePath = path.join(outputPath, fileName);
                // console.log("file name is ",fileName);
                if (fs.existsSync(filePath)) {
                    console.log(`File ${fileName} already exists. Skipping this file.`);
                    continue;
                }
                const prompt = String(promptData[i].Prompt);
                // console.log(prompt);
                
                const payload =  {
                    "controlConfig": {
                        "dataTracking": true
                    },
                    "input": [
                        {
                            "source": prompt,
                        }
                    ],
                    "config": {
                        "gender": config.credentials.gender,
                        "language": {
                            "sourceLanguage": languages.gujarati
                        }
                    }
                }
                console.log("error 2");

                const responseData = await sendRequest(url,payload);
                console.log("error 4");
                // console.log(abc.data);
                // res.send(responseData);
                console.log("error 5");
                // console.log("hello manoj");
                const audioB64 = responseData.data.audio[0].audioContent;
                // console.log(audioB64);
                const buffer = Buffer.from(audioB64, 'base64');
                // const filePath = path.join(outputPath, fileName);

                fs.writeFile(filePath, buffer, (err) => {
                    if (err) {
                      console.error('Error writing file:', err);
                    } else {
                      console.log(`${i+1} ${fileName} saved successfully!`);
                    }
                });
            }
        }
    }catch{
        console.log("error found in try block : ",error);
    }
}

module.exports.soundConversion = soundConversion;