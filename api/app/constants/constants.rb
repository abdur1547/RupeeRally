# frozen_string_literal: true

module Constants
  SESSION_LIFETIME = 2.hours
  REFRESH_TOKEN_LIFETIME = 3.months
  TOKEN_TYPE = 'Bearer'
  DEFAULT_PER_PAGE = 50
  DEFAULT_PAGE = 1
  ORDER_DIRECTIONS = %w[asc ASC desc DESC].freeze
  API_DATE_FROMAT = '%d/%m/%Y'
  API_TIME_FROMAT = '%H:%M'
  DEBT_ACCOUNT_NAME = 'Debt'
  DEBT_CATEGORY_NAME = 'Debt'
end
