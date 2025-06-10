<script lang="ts">
  import { getFontUrl } from "./getFontUrl.ts";
  import {
    SciChartSurface,
    SciChartDefaults,
    XyDataSeries,
    FastLineRenderableSeries,
    NumericAxis,
    type TWebAssemblyChart,
  } from "scichart";
  import { onMount } from "svelte";

  let element1: HTMLDivElement | null = $state(null);
  let element2: HTMLDivElement | null = $state(null);

  function initializeChart(chart: TWebAssemblyChart, title: string): void {
    const fontUrl = getFontUrl("C:/Windows/Fonts/Verdana.ttf");
    chart.sciChartSurface.registerFont("Verdana", fontUrl);
    chart.sciChartSurface.title = title;

    const xAxis = new NumericAxis(chart.wasmContext);
    const yAxis = new NumericAxis(chart.wasmContext);
    chart.sciChartSurface.xAxes.add(xAxis);
    chart.sciChartSurface.yAxes.add(yAxis);

    const numSeries = 3;

    for (let i = 0; i < numSeries; i++) {
      const dataSeries = new XyDataSeries(chart.wasmContext);
      const lineSeries = new FastLineRenderableSeries(chart.wasmContext);
      lineSeries.dataSeries = dataSeries;

      chart.sciChartSurface.renderableSeries.add(lineSeries);

      for (let j = 0; j < 100; j++) {
        dataSeries.append(j, (i + 1) * Math.sin(j / 3) + 0.1 * Math.random());
      }
    }
  }

  onMount(async (): Promise<void> => {
    SciChartSurface.UseCommunityLicense();
    SciChartDefaults.useNativeText = true;

    if (element1) {
      const chart = await SciChartSurface.create(element1);
      initializeChart(chart, "Chart 1");
    }

    if (element2) {
      const chart = await SciChartSurface.create(element2);
      initializeChart(chart, "Chart 2");
    }
  });
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .row {
    display: flex;
  }
</style>

<main>
  <div class="row">
    <div bind:this={element1} class="container" style="width: 400px; height: 400px;"></div>
    <div bind:this={element2} class="container" style="width: 400px; height: 400px;"></div>
  </div>
</main>
