async function trans(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data[0][0][0]);
}
trans("Dr. Viney Jetley communicates with patients and their families in a way that brings comfort and ease.");
