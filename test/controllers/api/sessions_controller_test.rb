require 'test_helper'

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_session = api_sessions(:one)
  end

  test "should get index" do
    get api_sessions_url, as: :json
    assert_response :success
  end

  test "should create api_session" do
    assert_difference('Api::Session.count') do
      post api_sessions_url, params: { api_session: { date: @api_session.date, host: @api_session.host } }, as: :json
    end

    assert_response 201
  end

  test "should show api_session" do
    get api_session_url(@api_session), as: :json
    assert_response :success
  end

  test "should update api_session" do
    patch api_session_url(@api_session), params: { api_session: { date: @api_session.date, host: @api_session.host } }, as: :json
    assert_response 200
  end

  test "should destroy api_session" do
    assert_difference('Api::Session.count', -1) do
      delete api_session_url(@api_session), as: :json
    end

    assert_response 204
  end
end
