<template>
  <div class="theme-default">
    <div class="uk-container">
      <nav>
        <div class="uk-navbar-left">
          <i class="fa fa-search" />

          <ul class="uk-navbar-nav">
            <li><a href="#">home</a></li>
            <li class="uk-active"><a href="#">about</a></li>
            <li class="has-children">
              <a href="#">Parent</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
            </li>
            <li><a href="#">Item</a></li>
          </ul>

        </div>
      </nav>
      <div>
        <vms-list
          cid="2"
          limit="0, 1"
        >
          <template
            slot-scope="{ article }"
          >
            <article v-if="article">
              <h1>{{ article.title }}</h1>
              <div
                class="content"
                v-html="md.parse(article.content)"
              />
            </article>
          </template>
        </vms-list>
      </div>
    </div>


    <!--<div class="uk-card uk-card-default uk-card-body">-->
    <!--<s-list-->
    <!--cid="2"-->
    <!--limit="0,5"-->
    <!--&gt;-->
    <!--<h1-->
    <!--slot="category"-->
    <!--slot-scope="category"-->
    <!--&gt;-->
    <!--<a :href="category.url">{{ category.title }}</a>-->
    <!--</h1>-->
    <!--<div-->
    <!--slot="article"-->
    <!--slot-scope="article"-->
    <!--&gt;-->
    <!--<div style="color:red">-->
    <!--标题: {{ article.title }}-->
    <!--</div>-->
    <!--<div style="color:red">-->
    <!--时间: {{ article.created_at }}-->
    <!--</div>-->
    <!--</div>-->
    <!--</s-list>-->
    <!--</div>-->
  </div>
</template>
<script>
import md from '../../helper/md';

export default {
  data() {
    return {
      md,
    };
  },
};
</script>
<style lang="scss" scoped>
  .theme-default {
    nav {
      padding: 18px 0;
    }

    a {
      transition: all 200ms ease-in-out 0s;
    }

    .fa-search {
      margin-right: 50px;
    }
    .uk-navbar-nav {
      a {
        font-size: 14px;
        color: #454545;
        font-family: "Crimson Text",serif;
        &:hover {
          color: #2196F3;
        }
      }

      > li {
        padding: 0 12px;

        > a {
          min-height: auto;
          height: 28px;
          padding: 0;
          border-bottom: 1px solid transparent;
          &:hover {
            border-bottom: 1px solid #2196F3;
          }
        }

        > .uk-navbar-dropdown {
          margin-top: 0;
          padding: 0;
          box-shadow: 0 0 4px rgba(0,0,0,0.09);
          > ul {
            padding: 0;
            > li {
              margin: 0;
              padding: 0;
              > a {
                line-height: 20px;
                min-width: 170px;
                margin: 0;
                padding: 10px;
                border-top: 1px solid #f4f4f4;
              }
            }
          }
        }

        &.uk-active {
          > a {
            color: #2196F3;
            border-bottom: 1px solid #2196F3;
          }
        }

        &.has-children {
          position: relative;
          padding-right: 20px;
          &:after {
            font: normal normal normal 14px/1 FontAwesome;
            font-size: inherit;
            font-size: 14px;
            position: absolute;
            top: 7px;
            right: 5px;
            display: inline-block;
            content: "\f107";
            transform: translate(0, 0);
            text-rendering: auto;
          }
          &:hover {
            > a {
              border-bottom: 1px solid transparent;
            }
            > .uk-navbar-dropdown {
              display: block;
            }
          }
          &:hover:after {
            content: "\f106";
          }
        }
      }
    }
  }
</style>
