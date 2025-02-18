# frozen_string_literal: true

module SharedTransactions
  class UserShareNotValidError < ::CustomError
    def message
      'user id in user shares is not valid'
    end
  end
end
