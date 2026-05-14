package com.backend.architecture;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

import static com.tngtech.archunit.library.Architectures.onionArchitecture;
import static com.tngtech.archunit.library.dependencies.SlicesRuleDefinition.slices;

@AnalyzeClasses(
    packages = "com.backend",
    importOptions = ImportOption.DoNotIncludeTests.class
)
public class ArchitectureTest {

    @ArchTest
    static final ArchRule onion_architecture = onionArchitecture()

        .domainModels("com.backend.domain.model..")

        .domainServices("com.backend.domain.repository..")

        .applicationServices("com.backend.application..")

        .adapter("presentation", "com.backend.presentation..")

        .adapter("infrastructure", "com.backend.infrastructure..")

        .withOptionalLayers(true);


    @ArchTest
    static final ArchRule infrastructure_adapters_should_not_depend_on_each_other =
        slices()
            .matching("com.backend.infrastructure.(*)..")
            .should()
            .beFreeOfCycles();
}