const isCurrentPage = (itemUrl, pageUrl) => {
  return (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0)
}

const linkActived = (itemUrl, pageUrl) => {
  let response = '';

  if (itemUrl === pageUrl) {
    response += ' aria-current="page"';
  }

  if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
    response += ' data-state="active"';
  }

  return response;
}

exports.isCurrentPage = isCurrentPage;
exports.linkActived = linkActived;