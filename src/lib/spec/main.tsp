import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@service(#{ title: "Mini Life Service" })
namespace MiniLifeService;

@route("/health")
@tag("Health")
op health(): {
  success: true;
};
