# frozen_string_literal: true

class Api::IngredientsController < ApplicationController
  before_action :set_item
  before_action :set_ingredient, only: %i[show update destroy]

  def index
    render json: @item.ingredients.all
  end

  def show
    render json: @ingredient
  end

  def create
    ingredient = @item.ingredients.new(ingredient_params)

    if ingredient.save
      render json: ingredient
    else
      render json: ingredient.errors, status: 422
    end
  end

  def update
    if @ingredient.update(ingredient_params)
      render json: @ingredient
    else
      render json: ingredient.errors, status: 423
    end
  end

  def destroy
    @ingredient.destroy
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, :assigned, :complete)
  end

  def set_ingredient
    @ingredient = @item.ingredients.find(params[:id])
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
end
