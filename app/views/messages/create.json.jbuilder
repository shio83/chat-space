json.id         @message.id
json.content    @message.content
json.date       @message.created_at.to_s(:datetime)
json.user_name  @message.user.name
json.image      @message.image.url