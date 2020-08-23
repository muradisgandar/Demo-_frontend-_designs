function Translate(word, language) {
    this.apiKey = "this_is_mock_api_key_because_yandex_api_no_longer_supports_free_api_key";
    this.word = word;
    this.language = language;

    // XHR object

    this.xhr = new XMLHttpRequest();

}

Translate.prototype.translateWord = function (callback) {

    const endpoint = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&text=${this.word}&lang=${this.language}`;

    this.xhr.open("GET",endpoint);

    this.xhr.onload = () => {
        if(this.xhr.status === 200){
            const json = JSON.parse(this.xhr.responseText);

            const text = json.text[0];

            callback(null,text);
            // console.log(JSON.parse(this.xhr.responseText).text[0]);
        }
        else{
            callback("Error",null);
        }
    }

    this.xhr.send();


};

Translate.prototype.changeParameters = function(newWord,newLanguage){
    this.word = newWord;
    this.language = newLanguage;
}