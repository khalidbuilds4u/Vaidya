const lucide = require('lucide-react');
console.log("lucide Search:", typeof lucide.Search);
if (lucide.Search && lucide.Search.$$typeof) {
  console.log("Search $$typeof:", lucide.Search.$$typeof.toString());
}
