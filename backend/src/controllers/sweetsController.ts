import type { Request, Response } from 'express';
import { SweetModel } from '../models/Sweet.ts';

export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetModel.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create sweet' });
  }
};

export const getSweets = async (_req: Request, res: Response) => {
  try {
    const sweets = await SweetModel.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sweets' });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query: Record<string, unknown> = {};
    if (typeof name === 'string') query.name = name;
    if (typeof category === 'string') query.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {} as Record<string, number>;
      if (typeof minPrice === 'string') (query.price as Record<string, number>).$gte = Number(minPrice);
      if (typeof maxPrice === 'string') (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
    const sweets = await SweetModel.find(query);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search sweets' });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update sweet' });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetModel.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.status(200).json({ message: 'Sweet deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete sweet' });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetModel.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    if (sweet.quantity < 1) return res.status(400).json({ error: 'Out of stock' });
    sweet.quantity -= 1;
    await sweet.save();
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to purchase sweet' });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await SweetModel.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    sweet.quantity += Number(req.body.amount || 1);
    await sweet.save();
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to restock sweet' });
  }
};
