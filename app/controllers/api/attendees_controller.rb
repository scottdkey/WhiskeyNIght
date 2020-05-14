class Api::AttendeesController < ApplicationController
  before_action :set_api_attendee, only: [:show, :update, :destroy]

  # GET /api/attendees
  def index
    @api_attendees = Api::Attendee.all

    render json: @api_attendees
  end

  # GET /api/attendees/1
  def show
    render json: @api_attendee
  end

  # POST /api/attendees
  def create
    @api_attendee = Api::Attendee.new(api_attendee_params)

    if @api_attendee.save
      render json: @api_attendee, status: :created, location: @api_attendee
    else
      render json: @api_attendee.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/attendees/1
  def update
    if @api_attendee.update(api_attendee_params)
      render json: @api_attendee
    else
      render json: @api_attendee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/attendees/1
  def destroy
    @api_attendee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_attendee
      @api_attendee = Api::Attendee.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def api_attendee_params
      params.require(:api_attendee).permit(:name, :going, :api_session_id)
    end
end
