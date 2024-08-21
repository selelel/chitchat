export const Parse_Message = async (error: any) => {
    return JSON.stringify(await error.message).replace('"', "").split(':')[0]
}

export const Parse_Object = async (error: any) => {
    const cleanedMessageForParsing = JSON.stringify(await error.message).replace('"', "")
    // const parsedObject = JSON.parse(cleanedMessageForParsing);
    console.log('Parsed Object:', cleanedMessageForParsing);
}

