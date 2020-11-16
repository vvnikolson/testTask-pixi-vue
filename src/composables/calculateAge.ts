export default function(dateOfBirth: string) : string {
    try {
        const regExp = /(\d{2}).(\d{2}).(\d{4})/
            , [, day, month, year] = dateOfBirth.match(regExp)!
            , dateObject = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
        return Math.abs(new Date( (Date.now() - dateObject.getTime())).getUTCFullYear() - 1970).toString()
    } catch (e) {
        console.log(e)
        return '-'
    }

}