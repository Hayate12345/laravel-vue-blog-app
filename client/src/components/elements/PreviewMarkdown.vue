<script lang="ts" setup>
defineProps({
  markdownContent: String
})
</script>

<template>
  <div class="content" v-html="markdownContent"></div>
</template>

<style>
.content {
  h2 {
    margin-top: 45px;
    margin-bottom: 10px;
    line-height: 1.5;
    font-size: 22px;
    font-weight: bold;
  }

  h3 {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 19px;
    font-weight: bold;
    line-height: 1.5;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    word-break: break-all;
    margin-bottom: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 10px 0;
    padding-left: 25px;
    position: relative;
  }

  li::before {
    content: '•';
    color: gray;
    font-size: 28px;
    position: absolute;
    left: 10px;
    top: -10px;
  }

  pre {
    margin: 10px 0;
    padding: 15px;
    border: solid 1px #eaedf2;
    border-radius: 5px;
    background: #f3f6fc;
    color: #54687c;
    border-radius: 5px;
    overflow-x: auto;

    code {
      font-family: Menlo, Consolas, 'DejaVu Sans Mono', monospace;
      line-height: 1.6;
    }
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }

  blockquote {
    border-left: 3px solid gray;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f7f7f7;
  }

  a {
    color: #3ea8ff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  strong {
    font-weight: bold;
  }

  iframe {
    width: 100%;
    height: 200px;

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      height: 350px;
    }

    @media only screen and (min-width: 1024px) {
      height: 450px; 
    }
  }
}
</style>
