class Api::SessionsController < ApplicationController
  before_action :set_api_session, only: [:show, :update, :destroy]

  # GET /api/sessions
  def index
    @api_sessions = Api::Session.all

    render json: @api_sessions
  end

  # GET /api/sessions/1
  def show
    render json: @api_session
  end

  # POST /api/sessions
  def create
    @api_session = Api::Session.new(api_session_params)

    if @api_session.save
      render json: @api_session, status: :created, location: @api_session
    else
      render json: @api_session.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/sessions/1
  def update
    if @api_session.update(api_session_params)
      render json: @api_session
    else
      render json: @api_session.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/sessions/1
  def destroy
    @api_session.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_session
      @api_session = Api::Session.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def api_session_params
      params.require(:api_session).permit(:date, :host)
    end
end
