const in_uids = (array, uids) => {

    if (Array.isArray(array) && Array.isArray(uids)) {
        return array.map(item => {
            const uid = uids.filter(uid => uid === item.uid)
            if (uid.length) return item
        })
    }
    else {
        console.error("💀 $1, $2 must be Array !")
    }
}



exports.in_uids = in_uids;