class JsonWebToken
    SECRET_KEY = Rails.application.credentials.secret_key_base || 'your-secret-key'

    def self.encode(payload, exp = 24.hours.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end

    def self.decode(token)
        body = JWT.decode(token, SECRET_KEY)[0]
        HashWithIndifferentAccess.new(body)
    rescue JWT::DecodeError => e
        nil
    end
end