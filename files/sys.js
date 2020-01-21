module.exports = {
    getRandomInt: function(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        let val = Math.floor(Math.random() * (max - min + 1)) + min
        return val * 1000;
    }
};