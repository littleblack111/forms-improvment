function getUserFeedback() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const reply = spreadsheet.getSheetByName('Reply'); // Get the sheet named "Reply"
    const feedback = spreadsheet.getSheetByName('Feedback'); // Get the sheet named "Reply"
    var reply_data = reply.getDataRange().getValues(); // Get all data in the sheet
    const feedback_data = feedback.getDataRange().getValues(); // Get all data in the sheet
    const userEmail = Session.getActiveUser().getEmail(); // Get current user's email
    var result = [];

    reply_data.shift();
    
    // Assuming the email is in the first column (index 0)
    for (let i = 0; i < reply_data.length; i++) {
        if (reply_data[i][1] === userEmail) {
            reply_data[i].shift();
            reply_data[i].shift();
            data = reply_data[i];
            for (let j = 0; j < data.length; j++) {
                for (let k = 0; k < feedback_data[j].length; k+=2) {
                    if (data[j] == feedback_data[j][k]) {
                        result.push(feedback_data[j][k + 1]);
                        break; // Assuming there's only one match, we can break the loop once found
                    }
                }
            }
        }
    }
    return result;
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
}
