import "@typespec/http";
import "@typespec/rest";

import "./models/common.tsp";
import "./models/user.tsp";
import "./models/card.tsp";

import "./services/user.tsp";
import "./services/card.tsp";

@service(#{ title: "Mini Life Service" })
namespace MiniLifeService;
