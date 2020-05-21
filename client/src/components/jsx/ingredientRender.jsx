const ingredients = await getIngredients(item.id);
  const getIngredients = async itemID => {
    const res = await axios.get(`/api/items/${itemID}/ingredients`);
    const newData = res.data;
    return newData;
  };

  const ingredientFormat = data => data.forEach(<>{data.name}</>);