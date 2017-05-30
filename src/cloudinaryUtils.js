export function calcDesiredWidth(ratioHW, desiredHeight) {
  if (ratioHW !== 0) {
    return desiredHeight / ratioHW;
  }
  return 0;
}

export function addTransformationToURL(url, transformation) {
  const tokens = url.split('upload/');

  // url pattern not expected
  if (url === tokens[0] || tokens.length !== 2) {
    return url;
  }

  return tokens[0] + `upload/${transformation}/` + tokens[1];
}
