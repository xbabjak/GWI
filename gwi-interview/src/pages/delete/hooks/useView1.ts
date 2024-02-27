export async function getView1Data() {
  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Dwpo3nJNqmH8xQWMVomZRCemxu9Qv2P8OClaBwfjB89nOfhHczGEGyFoCTlTbVWK"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  console.log(res);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
