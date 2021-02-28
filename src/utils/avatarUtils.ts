import gravatar from "gravatar";

class AvatarUtils {
  avatarUrl(email: string): string {
    const options: gravatar.Options = {
      s: "200",
      r: "pg",
      d: "mm"
    };

    const avatar = gravatar.url(email, options, true);

    return avatar;
  }
}
export default new AvatarUtils();