function IdCheck(id) {
    const budgetToCheck = /^[0-9]+$/.test(id)
    if (!budgetToCheck)
        throw "Wrong id intput"
}

exports.IdCheck = IdCheck