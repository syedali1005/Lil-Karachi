import Items from "../models/itemModel.js";

//get items
export const getItemController = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

//add items
export const addItemController = async (req, res) => {
  try {
    const newItem = new Items(req.body);
    await newItem.save();
    res.status(201).send("Item Created Successfully !");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//edit items
export const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await Items.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });
    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
export const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await Items.findOneAndDelete({ _id: itemId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
