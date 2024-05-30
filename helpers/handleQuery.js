
const handleQuery = (query, tagTb = '') => {
    const key = Object.keys(query);
    const value = Object.values(query);
    const result = key.reduce((gt, item, index) => tagTb + item.trim() + '=' + `"${value[index].trim()}"` + ' && ' + gt, '.').replace('&& .', '');
    return result;
}

const handleQueryProduct = (query) => {
    const category = query.category && JSON.parse(query.category);
    const category1 = query.category1 && JSON.parse(query.category1);
    const category2 = query.category2 && JSON.parse(query.category2);
    const brand = query.brand && JSON.parse(query.brand);
    const product = query.product && JSON.parse(query.product);
    let result = '(';
    result += category ? (`c.${Object.keys(category)[0]} = "${Object.values(category)[0]}"`) : '';
    result += (category && category1) ? (` and c1.${Object.keys(category1)[0]} = "${Object.values(category1)[0]}"`) : '';
    result += (category && category1 && category2) ? (` and c2.${Object.keys(category2)[0]} = "${Object.values(category2)[0]}"`) : '';
    result += ') and (';
    brand && brand.forEach((item, index) => {
        result += `b.id = ${item}`;
        if (index !== brand.length - 1) {
            result += ' or ';
        }
    });
    result += ') and (';
    result += product ? (product.price ? `(p.price >= ${product.price.from} and p.price <= ${product.price.to}) or (p.sale_price >= ${product.price.from} and p.sale_price <= ${product.price.to})` : '') : '';
    result += ')';
    result = result.replace(/(\(\)) and \(\) and \(\)/g, '');
    result = result.replace(/(and) \(\) and \(\)/g, '');
    result = result.replace(/(\(\)) and \(\) and/g, '');
    result = result.replace(/(and) \(\)/g, '');
    result = result.replace(/(\(\)) and/g, '');
    result = result.replace(/\(\)/g, '');
    // console.log(result)
    return result.trim() !== '' ? 'where ' + result : '';
}

module.exports = { handleQuery, handleQueryProduct };