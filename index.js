const moment = require('moment');

module.exports.templateTags = [{
    name: 'randomdate',
    displayName: 'Random Date',
    description: 'Generate a random Date',
    args: [
        {
            displayName: 'Format',
            defaultValue: 'datetime',
            type: 'enum',
            options: [
                { displayName: 'ISO8601', value: 'datetime' },
                { displayName: 'Unix', value: 'unix' },
                { displayName: 'Custom', value: 'custom' },
            ],
        },
        {
            displayName: 'Earlier / Now / Upcoming',
            defaultValue: 'future',
            type: 'enum',
            options: [
                { displayName: 'Earlier', value: 'past' },
                { displayName: 'Now', value: 'now' },
                { displayName: 'Upcoming', value: 'future' },
            ],
        },
        {
            help: 'momentjs.com/docs/#/displaying/format/',
            displayName: 'Moment.js format - Only if selected format is Custom',
            type: 'string',
            placeholder: 'MMMM Do YYYY, h:mm:ss a',
        },
        {
            displayName: 'Maximum deviation in days (earlier or upcoming)',
            type: 'number',
            defaultValue: 365
        },
    ],

    async run (context, format = 'datetime', pastOrFuture = 'future', customFormat, maxDayRange = 365) {
        let randomDate;
        let datetime;
        // we convert number of days in seconds to permit time randomization
        let maxSecondRange = maxDayRange * 86400;

        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

        switch (pastOrFuture) {
            case 'past':
                datetime = moment().subtract(getRandomInt(0,maxSecondRange), 's');
                break;
            case 'now':
                datetime = moment();
                break;
            case 'future':
                datetime = moment().add(getRandomInt(0,maxSecondRange), 's');
                break;
            default:
                throw new Error("Invalid option set: that should never happen");
        }

        switch (format) {
            case 'datetime':
                randomDate = datetime.toISOString();
                break;
            case 'unix':
                randomDate = datetime.unix();
                break;
            case 'custom':
                randomDate = datetime.format(customFormat);
                break;
            default:
                throw new Error("Invalid format set: that should never happen");
        }

        return randomDate;
    }
}];
