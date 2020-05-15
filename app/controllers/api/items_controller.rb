class Api::ItemsController < ApplicationController
  before_action :set_session
  before_action :set_item, only: %i[show update destroy]

  def index
    render json: @session.items.all
  end

  def show
    render json: @item
  end

  def create
    item = @session.items.new(item_params)

    if item.save
      render json: item
    else
      render json: item.errors, status: 422
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: item.errors, status: 423
    end
  end

  def destroy
    @item.destroy
  end

  private

  def item_params
    params.require(:item).permit(:label, :assigned, :foodstuff)
  end

  def set_item
    @item = @session.item.find(params[:id])
  end

  def set_session
    @session = Session.find(params[:session_id])
  end
end
