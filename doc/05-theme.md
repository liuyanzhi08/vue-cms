# 主题

**设置主页主题**：ADMIN后台 -> COMMON菜单 -> indexTheme -> 提交

设置搜索页主题：ADMIN后台 -> COMMON菜单 -> searchTheme -> 提交

设置文章列表页主题：ADMIN后台 -> CATEGORY菜单 -> 左侧:点击文件树中的文件夹 ->
    右侧：点击"ADVANCED SETTING" -> 选择主题 -> 提交

设置文章主题：ADMIN后台 -> CATEGORY菜单 -> 左侧:点击文件树中的文件 ->
    右侧：点击"ADVANCED SETTING" -> 选择主题 -> 提交


# 自定义主题

系统内置了两套模板：theme-blog和theme-portal。但是你也可以自定义自己的
主题。运行指令`npm run theme:generate your_theme_name`即可在`src/client/theme`
生成一个文件夹下找一个一个名为your_theme_name的主题，编辑里面模板来定制自己的主题。

## 定制主页

参考源代码，编辑`src/client/theme/your_theme_name/index.vue`

## 定制列表页

参考源代码，编辑`src/client/theme/your_theme_name/list.vue`

## 定制详情页

参考源代码，编辑`src/client/theme/your_theme_name/list.vue`

