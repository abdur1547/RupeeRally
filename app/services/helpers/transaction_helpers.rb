# frozen_string_literal: true

module Helpers
  module TransactionHelpers
    def revert_amount_changes(amount_cents, previous_account, previous_category, previous_direction)
      adjust_account_balance(previous_account, -amount_cents, previous_direction)
      adjust_category_balance(previous_category, -amount_cents)
    end

    def apply_amount_changes(amount_cents, new_account, new_category, new_direction)
      adjust_account_balance(new_account, amount_cents, new_direction)
      adjust_category_balance(new_category, amount_cents)
    end

    def adjust_account_balance(account, amount, direction)
      if ['expense', :expense].include?(direction)
        account.record_expense(amount)
      else
        account.record_income(amount)
      end
      account.save!
    end

    def adjust_category_balance(category, amount)
      category.update_balance(amount)
      category.save!
    end
  end
end
