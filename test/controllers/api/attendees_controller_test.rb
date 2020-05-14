require 'test_helper'

class Api::AttendeesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_attendee = api_attendees(:one)
  end

  test "should get index" do
    get api_attendees_url, as: :json
    assert_response :success
  end

  test "should create api_attendee" do
    assert_difference('Api::Attendee.count') do
      post api_attendees_url, params: { api_attendee: { api_session_id: @api_attendee.api_session_id, going: @api_attendee.going, name: @api_attendee.name } }, as: :json
    end

    assert_response 201
  end

  test "should show api_attendee" do
    get api_attendee_url(@api_attendee), as: :json
    assert_response :success
  end

  test "should update api_attendee" do
    patch api_attendee_url(@api_attendee), params: { api_attendee: { api_session_id: @api_attendee.api_session_id, going: @api_attendee.going, name: @api_attendee.name } }, as: :json
    assert_response 200
  end

  test "should destroy api_attendee" do
    assert_difference('Api::Attendee.count', -1) do
      delete api_attendee_url(@api_attendee), as: :json
    end

    assert_response 204
  end
end
